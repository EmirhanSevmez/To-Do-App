package database

import (
	"fmt"
	"log"
	"todoapi/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	dsn := "host=database user=postgres password=admin1234 dbname=tododb port=5432 sslmode=disable" //change this later
	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	fmt.Println("Connected to database")
	DB.AutoMigrate(&models.User{})
	fmt.Println("Database migrated successfully")

}
