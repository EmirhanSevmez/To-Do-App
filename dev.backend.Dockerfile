FROM golang:1.25.4-alpine


WORKDIR /todoapp
COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY . .
RUN go build -o main ./
ENTRYPOINT [ "./main" ]