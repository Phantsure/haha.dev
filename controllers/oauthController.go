package controllers

import (
	"fmt"
	"io"
	"net/http"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/robbyklein/gr/helpers"
	"golang.org/x/oauth2"
)

func SignIn(c *fiber.Ctx) error {
	return c.Render("index", fiber.Map{})
}

func OAuthLogin(c *fiber.Ctx) error {
	url := helpers.GoogleOAuthConfig.AuthCodeURL("random")
	return c.Redirect(url)
}

func OAuthCallback(c *fiber.Ctx) error {
	if c.FormValue("state") != "random" {
		fmt.Println("state is not valid")
		return c.Redirect("/")
	}

	token, err := helpers.GoogleOAuthConfig.Exchange(oauth2.NoContext, c.FormValue("code"))
	if err != nil {
		fmt.Printf("could not get token: %s\n", err.Error())
		c.Redirect("/")
		return err
	}

	resp, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token.AccessToken)
	if err != nil {
		fmt.Printf("could not get request: %s\n", err.Error())
		c.Redirect("/")
		return err
	}

	defer resp.Body.Close()
	content, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Printf("could not parse response: %s\n", err.Error())
		c.Redirect("/")
		return err
	}

	c.Cookie(&fiber.Cookie{
		Name:    "session_token",
		Value:   string(content),
		Expires: time.Now().Add(10 * time.Minute),
	})
	return c.Redirect("/")
}
