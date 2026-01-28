package controllers

import (
	"net/http"
	"todoapi/database"
	"todoapi/models"

	"github.com/gin-gonic/gin"
)

func GetTodos(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	u := user.(models.User)

	search := c.Query("search")
	var todos []models.Todo

	query := database.DB.Where("user_id = ?", u.ID)
	if search != "" {
		query = query.Where("title ILIKE ?", "%"+search+"%")
	}
	query.Find(&todos)

	c.JSON(http.StatusOK, todos)
}

func CreateTodo(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	u := user.(models.User)

	var todo models.Todo
	if err := c.ShouldBindJSON(&todo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	todo.UserID = u.ID
	if err := database.DB.Create(&todo).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, todo)
}

func UpdateTodo(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	u := user.(models.User)

	id := c.Param("id")
	var todo models.Todo

	if err := database.DB.Where("id = ? AND user_id = ?", id, u.ID).First(&todo).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Todo not found"})
		return
	}

	var input models.Todo
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	todo.Title = input.Title
	todo.Completed = input.Completed

	database.DB.Save(&todo)
	c.JSON(http.StatusOK, todo)
}

func DeleteTodo(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	u := user.(models.User)

	id := c.Param("id")
	var todo models.Todo

	if err := database.DB.Where("id = ? AND user_id = ?", id, u.ID).First(&todo).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Todo not found"})
		return
	}

	database.DB.Delete(&todo)
	c.JSON(http.StatusOK, gin.H{"message": "Todo deleted"})
}
