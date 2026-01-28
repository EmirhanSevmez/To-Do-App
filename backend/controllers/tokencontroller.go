package controllers

import (
	"net/http"
	"todoapi/auth"
	"todoapi/database"
	"todoapi/models"

	"github.com/gin-gonic/gin"
)

type TokenRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func GenerateToken(c *gin.Context) {
	var request TokenRequest
	var user models.User
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}
	username := database.DB.Where("username = ?", request.Username).First(&user)
	if username.Error != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
		return
	}
	credentialError := user.CheckPassword(request.Password)
	if credentialError != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
		return
	}
	tokenString, err := auth.GenerateJWT(user.Username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("token", tokenString, 3600, "/", "", false, true)
	c.JSON(http.StatusOK, gin.H{"token": tokenString})
}
