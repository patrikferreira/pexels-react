# Pexels API App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Overview

This application allows you to search for photos and videos from Pexels. To use the app, you need to provide your own API key from Pexels.

## Getting Started

Follow the steps below to get your environment set up and start using the app:

### 1. Obtain Your Pexels API Key

In order to access the Pexels API, you need to create an API key. Here's how to do it:

1. Go to the [Pexels API page](https://www.pexels.com/pt-br/api/key/).
2. Create an account or log in to your existing account.
3. Copy your API key.

### 2. Set Up Your `.env` File

Once you have your API key, you need to add it to your project:

1. Create a `.env` file at the root of your project (if it doesn't already exist).
2. Add the following line to the `.env` file:

    ```env
    PEXELS_API_KEY=YOUR_API_KEY_HERE
    ```

3. Replace `YOUR_API_KEY_HERE` with the API key you copied from Pexels.

### 3. Install Dependencies

Before running the app, install the required dependencies by running one of the following commands:

```bash
npm install
# or
yarn install
# or
pnpm install
