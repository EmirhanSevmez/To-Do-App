package main

import (
	"todoapi/controllers"
	"todoapi/database"
	"todoapi/middlewares"

	"github.com/gin-gonic/gin"
)

func main() {
	database.ConnectDB()
	router := gin.Default()

	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	api := router.Group("/api/v1")
	{
		auth := api.Group("/auth")
		{
			auth.POST("/register", controllers.RegisterUser)
			auth.POST("/token", controllers.GenerateToken)
			auth.GET("/logout", controllers.Logout)
		}
		secured := api.Group("/secured").Use(middlewares.AuthMiddleware())
		{
			secured.GET("/ping", controllers.Ping)
			secured.GET("/todos", controllers.GetTodos)
			secured.POST("/todos", controllers.CreateTodo)
			secured.PUT("/todos/:id", controllers.UpdateTodo)
			secured.DELETE("/todos/:id", controllers.DeleteTodo)
		}

	}
	router.Run(":8080")
}
