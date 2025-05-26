#!/bin/bash

# Stage all changes
git add .

# Create a commit with a message
git commit -m "Update deployment configuration for Render"

# Push to the main branch
git push origin main

# Show status after push
git status
