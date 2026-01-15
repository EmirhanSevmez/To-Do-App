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

	api := router.Group("/api/v1")
	{
		api.Group("/auth")
		{
			api.POST("/register", controllers.RegisterUser)
			api.POST("/token", controllers.GenerateToken)
		}
		secured := api.Group("/secured").Use(middlewares.AuthMiddleware())
		{
			secured.GET("/ping", controllers.Ping)
		}

	}
	router.Run(":8080")
}
