package helpers

import (
	"github.com/robbyklein/gr/initializers"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var (
	GoogleOAuthConfig = &oauth2.Config{
		RedirectURL:  "http://localhost:3000/callback",
		ClientID:     initializers.GetEnvVar("GOOGLE_CLIENT_ID"),
		ClientSecret: initializers.GetEnvVar("GOOGLE_CLIENT_SECRET"),
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email"},
		Endpoint:     google.Endpoint,
	}
)
