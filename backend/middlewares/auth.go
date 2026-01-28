package middlewares

import (
	"todoapi/auth"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString, err := c.Cookie("token")
		if err != nil {
			c.JSON(401, gin.H{"error": "request does not contain an access token"})
			c.Abort()
			return
		}
		err = auth.ValidateToken(tokenString)
		if err != nil {
			c.JSON(401, gin.H{"error": err.Error()})
			c.Abort()
			return
		}
		c.Next()
	}
}
