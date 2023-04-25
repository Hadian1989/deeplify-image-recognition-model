import torch
import torch.nn as nn
from PIL import Image
from torchvision import models, transforms


"""
This file defines a pytorch model "DogClassifier". THe model accepts RGB images and predicts
whether they show dogs(output 0) or cats(output 1).
"""


class DogClassifier(nn.Module):
    def __init__(self):
        super(DogClassifier, self).__init__()
        self.features = models.resnet18(pretrained=True)
        self.features.fc = nn.Linear(in_features=512, out_features=2)

    def forward(self, x):
        x = self.features(x)
        return x


def preprocess_image(image_path):
    """
    Function to preprocess the image to the suitable format for the model
    :param image_path:
    :return:
    """
    transform = transforms.Compose(
        [
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ]
    )

    image = Image.open(image_path)
    image = transform(image)
    image = image.unsqueeze(0)
    return image


def predict(image_path):
    """
    Given a path to an image, predict whether dog or cat is on the image
    :param image_path:
    :return:
    """
    # Load the model
    model = DogClassifier()
    # Preprocess the image
    image = preprocess_image(image_path)

    # Make a prediction
    with torch.no_grad():
        output = model(image)
        predicted_class = torch.argmax(output).item()

    return "dog" if predicted_class == 1 else "cat"


if __name__ == "__main__":
    # Instantiate the model
    model = DogClassifier()

    # Load the weights
    model.load_state_dict(torch.load("dog_classifier.pt"))

    # Predict index of predicted class (0 dog, 1 cat)
    class_index = predict("dog.jpg")

    print("Predicted Class: ", class_index)
