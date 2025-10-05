FROM golang:1.25-alpine

ENV CGO_ENABLED=0

RUN apk add --no-cache ca-certificates git && update-ca-certificates

WORKDIR /app

# Install Air for live reload
RUN go install github.com/air-verse/air@latest

# Pre-copy mod files to leverage Docker layer caching when possible
COPY go.mod .
RUN go mod download

# Default command uses Air with the provided config
CMD ["/go/bin/air", "-c", ".air.toml"]

EXPOSE 8080



