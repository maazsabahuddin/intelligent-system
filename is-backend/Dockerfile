# Use a lightweight Python base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy code and install dependencies
COPY . /app
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port your app will run on (flask default port is 5000)
EXPOSE 5000

# Run Gunicorn with specified workers and binding to 0.0.0.0:5000
CMD ["gunicorn", "main:app", "--bind", "0.0.0.0:5000", "--workers", "2", "--timeout", "120"]
