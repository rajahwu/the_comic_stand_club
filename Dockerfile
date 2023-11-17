# Stage 1: Build React frontend
FROM node:16 AS frontend
WORKDIR /app
COPY react-app /app
RUN npm install
RUN npm run build

# Stage 2: Build Flask backend
FROM python:3.8 AS backend
WORKDIR /app
COPY . /app
RUN pip install --no-cache-dir -r requirements.txt

# Run Flask migrations and upgrade
RUN flask db migrate
RUN flask db upgrade

# Run Flask seeders
RUN flask seed all

# Final stage: Combine frontend and backend
FROM backend AS final
COPY --from=frontend /app/build /app/react-app/build

# Set environment variables
ENV FLASK_APP=app
ENV FLASK_RUN_HOST=0.0.0.0

# Install Gunicorn
RUN pip install gunicorn

# Start Gunicorn
CMD ["gunicorn", "app:app", "-b", "0.0.0.0:5000"]
