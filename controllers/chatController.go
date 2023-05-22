package controllers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/gofiber/fiber/v2"
)

type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type ChatRequest struct {
	Model       string    `json:"model"`
	Messages    []Message `json:"messages"`
	MaxTokens   int64     `json:"max_tokens"`
	Temperature float32   `json:"temperature"`
}

func Chat(c *fiber.Ctx) error {
	var UserChatContent Message

	if err := c.BodyParser(&UserChatContent); err != nil {
		return err
	}

	chat := ChatRequest{
		Model:       "gpt-3.5-turbo",
		Messages:    []Message{UserChatContent},
		MaxTokens:   100,
		Temperature: 0.7,
	}
	jsonReq, _ := json.Marshal(chat)

	// Logging
	fmt.Println(string(jsonReq))

	req, err := http.NewRequest("POST", "https://api.openai.com/v1/chat/completions", bytes.NewBuffer(jsonReq))
	if err != nil {
		fmt.Println("Error forming request", req)
	}

	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("Authorization", "Bearer "+os.Getenv("OPENAI_API_KEY"))

	client := &http.Client{}
	resp, _ := client.Do(req)

	// Log Response
	responseBody, _ := io.ReadAll(resp.Body)
	fmt.Println(string(responseBody))
	resp.Body.Close()

	return c.Status(fiber.StatusOK).JSON(string(responseBody))
}
