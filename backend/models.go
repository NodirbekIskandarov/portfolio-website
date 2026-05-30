package main

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Profile represents user profile information
type Profile struct {
	ID        primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name      string             `json:"name" bson:"name"`
	Title     string             `json:"title" bson:"title"`
	TitleRu   string             `json:"titleRu,omitempty" bson:"titleRu,omitempty"`
	TitleUz   string             `json:"titleUz,omitempty" bson:"titleUz,omitempty"`
	Bio       string             `json:"bio" bson:"bio"`
	BioRu     string             `json:"bioRu,omitempty" bson:"bioRu,omitempty"`
	BioUz     string             `json:"bioUz,omitempty" bson:"bioUz,omitempty"`
	Email     string             `json:"email" bson:"email"`
	Phone     string             `json:"phone" bson:"phone"`
	Location  string             `json:"location" bson:"location"`
	Avatar    string             `json:"avatar" bson:"avatar"`
	Resume    string             `json:"resume" bson:"resume"`
	Github    string             `json:"github" bson:"github"`
	LinkedIn  string             `json:"linkedin" bson:"linkedin"`
	Twitter   string             `json:"twitter" bson:"twitter"`
	Website   string             `json:"website" bson:"website"`
	UpdatedAt time.Time          `json:"updatedAt" bson:"updatedAt"`
}

// Skill represents a technical skill
type Skill struct {
	ID        primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name      string             `json:"name" bson:"name"`
	Category  string             `json:"category" bson:"category"`
	Level     int                `json:"level" bson:"level"`
	Icon      string             `json:"icon" bson:"icon"`
	Order     int                `json:"order" bson:"order"`
	CreatedAt time.Time          `json:"createdAt" bson:"createdAt"`
}

// Project represents a portfolio project
type Project struct {
	ID            primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Title         string             `json:"title" bson:"title"`
	TitleRu       string             `json:"titleRu,omitempty" bson:"titleRu,omitempty"`
	TitleUz       string             `json:"titleUz,omitempty" bson:"titleUz,omitempty"`
	Description   string             `json:"description" bson:"description"`
	DescriptionRu string             `json:"descriptionRu,omitempty" bson:"descriptionRu,omitempty"`
	DescriptionUz string             `json:"descriptionUz,omitempty" bson:"descriptionUz,omitempty"`
	Image         string             `json:"image" bson:"image"`
	Images        []string           `json:"images" bson:"images"`
	Technologies  []string           `json:"technologies" bson:"technologies"`
	GithubURL     string             `json:"githubUrl" bson:"githubUrl"`
	LiveURL       string             `json:"liveUrl" bson:"liveUrl"`
	Featured      bool               `json:"featured" bson:"featured"`
	Order         int                `json:"order" bson:"order"`
	CreatedAt     time.Time          `json:"createdAt" bson:"createdAt"`
}

// Experience represents work experience
type Experience struct {
	ID            primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Company       string             `json:"company" bson:"company"`
	CompanyRu     string             `json:"companyRu,omitempty" bson:"companyRu,omitempty"`
	CompanyUz     string             `json:"companyUz,omitempty" bson:"companyUz,omitempty"`
	Position      string             `json:"position" bson:"position"`
	PositionRu    string             `json:"positionRu,omitempty" bson:"positionRu,omitempty"`
	PositionUz    string             `json:"positionUz,omitempty" bson:"positionUz,omitempty"`
	Description   string             `json:"description" bson:"description"`
	DescriptionRu string             `json:"descriptionRu,omitempty" bson:"descriptionRu,omitempty"`
	DescriptionUz string             `json:"descriptionUz,omitempty" bson:"descriptionUz,omitempty"`
	Location      string             `json:"location" bson:"location"`
	StartDate     string             `json:"startDate" bson:"startDate"`
	EndDate       string             `json:"endDate" bson:"endDate"`
	Current       bool               `json:"current" bson:"current"`
	Order         int                `json:"order" bson:"order"`
	CreatedAt     time.Time          `json:"createdAt" bson:"createdAt"`
}

// Testimonial represents client testimonial
type Testimonial struct {
	ID        primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name      string             `json:"name" bson:"name"`
	Position  string             `json:"position" bson:"position"`
	Company   string             `json:"company" bson:"company"`
	Avatar    string             `json:"avatar" bson:"avatar"`
	Content   string             `json:"content" bson:"content"`
	Rating    int                `json:"rating" bson:"rating"`
	Order     int                `json:"order" bson:"order"`
	CreatedAt time.Time          `json:"createdAt" bson:"createdAt"`
}

// BlogPost represents a blog post
type BlogPost struct {
	ID        primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Title     string             `json:"title" bson:"title"`
	TitleRu   string             `json:"titleRu,omitempty" bson:"titleRu,omitempty"`
	TitleUz   string             `json:"titleUz,omitempty" bson:"titleUz,omitempty"`
	Slug      string             `json:"slug" bson:"slug"`
	Content   string             `json:"content" bson:"content"`
	ContentRu string             `json:"contentRu,omitempty" bson:"contentRu,omitempty"`
	ContentUz string             `json:"contentUz,omitempty" bson:"contentUz,omitempty"`
	Excerpt   string             `json:"excerpt" bson:"excerpt"`
	ExcerptRu string             `json:"excerptRu,omitempty" bson:"excerptRu,omitempty"`
	ExcerptUz string             `json:"excerptUz,omitempty" bson:"excerptUz,omitempty"`
	Image     string             `json:"image" bson:"image"`
	Tags      []string           `json:"tags" bson:"tags"`
	Published bool               `json:"published" bson:"published"`
	Views     int                `json:"views" bson:"views"`
	CreatedAt time.Time          `json:"createdAt" bson:"createdAt"`
	UpdatedAt time.Time          `json:"updatedAt" bson:"updatedAt"`
}

// Contact represents a contact message
type Contact struct {
	ID        primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name      string             `json:"name" bson:"name"`
	Email     string             `json:"email" bson:"email"`
	Subject   string             `json:"subject" bson:"subject"`
	Message   string             `json:"message" bson:"message"`
	Read      bool               `json:"read" bson:"read"`
	CreatedAt time.Time          `json:"createdAt" bson:"createdAt"`
}

// Admin represents admin user
type Admin struct {
	ID        primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Username  string             `json:"username" bson:"username"`
	Password  string             `json:"-" bson:"password"`
	Email     string             `json:"email" bson:"email"`
	CreatedAt time.Time          `json:"createdAt" bson:"createdAt"`
}

type LoginRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type LoginResponse struct {
	Token string `json:"token"`
	User  Admin  `json:"user"`
}
