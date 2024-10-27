# Mistletoe Detection

## Overview

Mistletoe Detection is a web application that allows users to upload images for the detection of mistletoe using an AI-powered API. Built with vanilla HTML, CSS, and JavaScript, this project demonstrates how to interact with an API to receive and display results based on image input.

## Features

- **Image Upload**: Users can upload images through a simple form.
- **API Integration**: Connects to an AI model that analyzes the image and returns a detection result.
- **Dynamic Feedback**: Displays success or failure messages based on the API response.

## Technologies Used

- HTML
- CSS
- JavaScript (Vanilla)
- AI API for mistletoe detection

## How It Works

1. **Image Submission**: The user selects an image using the provided form and submits it.
2. **API Call**: The application sends a POST request to the API with the image data.
3. **Response Handling**: The API responds with a status (1 for success, 0 for failure). The application displays the corresponding message on the page.

## Getting Started

To get a local copy of this project up and running, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/Mistletoe-Detection.git
   ```

2. Navigate to the project directory and open the `index.html` file in your web browser. **Note**: To run it locally, you need to execute it on a server. You can use the **Live Server** extension in VSCode, **Live Preview**, or open it manually in a server environment.

3. The application is also deployed and accessible at [https://mistletoe-detection.onrender.com](https://mistletoe-detection.onrender.com).
