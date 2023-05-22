package controllers

import "github.com/gofiber/fiber/v2"

func Home(c *fiber.Ctx) error {
	if c.Cookies("session_token") == "" {
		c.Redirect("/sign-in")
	}

	return c.Render("index", fiber.Map{})
}
