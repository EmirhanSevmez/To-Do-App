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
		auth := api.Group("/auth")
		{
			auth.POST("/register", controllers.RegisterUser)
			auth.POST("/token", controllers.GenerateToken)
		}
		secured := api.Group("/secured").Use(middlewares.AuthMiddleware())
		{
			secured.GET("/ping", controllers.Ping)
		}

	}
	router.Run(":8080")
}
