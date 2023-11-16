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

# Final stage: Combine frontend and backend
FROM backend AS final
COPY --from=frontend /app/build /app/react-app/build
CMD ["flask", "run"]
