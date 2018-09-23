# CongoAI v0.0.0



- [auth](#auth)
	- [authenticate](#authenticate)
	
- [cart](#cart)
	- [Create cart](#create-cart)
	- [Delete cart](#delete-cart)
	- [Retrieve cart](#retrieve-cart)
	- [Retrieve carts](#retrieve-carts)
	- [Update cart](#update-cart)
	
- [model](#model)
	- [Create model](#create-model)
	- [Delete model](#delete-model)
	- [Retrieve model](#retrieve-model)
	- [Retrieve models](#retrieve-models)
	- [Update model](#update-model)
	
- [notebook](#notebook)
	- [Create notebook](#create-notebook)
	- [Delete notebook](#delete-notebook)
	- [Retrieve notebook](#retrieve-notebook)
	- [Retrieve notebooks](#retrieve-notebooks)
	- [Update notebook](#update-notebook)
	
- [passwordreset](#passwordreset)
	- [Send email](#send-email)
	- [Submit password](#submit-password)
	- [Verify token](#verify-token)
	
- [product](#product)
	- [Create product](#create-product)
	- [Delete product](#delete-product)
	- [Retrieve product](#retrieve-product)
	- [Retrieve products](#retrieve-products)
	- [Update product](#update-product)
	
- [review](#review)
	- [Create review](#create-review)
	- [Delete review](#delete-review)
	- [Retrieve review](#retrieve-review)
	- [Retrieve reviews](#retrieve-reviews)
	- [Update review](#update-review)
	
- [transaction](#transaction)
	- [Create transaction](#create-transaction)
	- [Delete transaction](#delete-transaction)
	- [Retrieve transaction](#retrieve-transaction)
	- [Retrieve transactions](#retrieve-transactions)
	- [Update transaction](#update-transaction)
	
- [user](#user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Update password](#update-password)
	- [Update user](#update-user)
	


# auth

## authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|

# cart

## Create cart



	POST /carts


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| products			| 			|  <p>cart's products.</p>							|

## Delete cart



	DELETE /carts/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve cart



	GET /carts/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve carts



	GET /carts


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update cart



	PUT /carts/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| products			| 			|  <p>cart's products.</p>							|

# model

## Create model



	POST /models


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| notebook			| 			|  <p>model's notebook.</p>							|
| name			| 			|  <p>model's name.</p>							|
| port			| 			|  <p>model's port.</p>							|
| filepath			| 			|  <p>model's filepath.</p>							|
| category			| 			|  <p>model's category.</p>							|

## Delete model



	DELETE /models/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve model



	GET /models/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve models



	GET /models


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update model



	PUT /models/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| notebook			| 			|  <p>model's notebook.</p>							|
| name			| 			|  <p>model's name.</p>							|
| port			| 			|  <p>model's port.</p>							|
| filepath			| 			|  <p>model's filepath.</p>							|
| category			| 			|  <p>model's category.</p>							|

# notebook

## Create notebook



	POST /notebooks


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| html			| 			|  <p>notebook's html.</p>							|
| model			| 			|  <p>notebook's model.</p>							|

## Delete notebook



	DELETE /notebooks/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve notebook



	GET /notebooks/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve notebooks



	GET /notebooks


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update notebook



	PUT /notebooks/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| html			| 			|  <p>notebook's html.</p>							|
| model			| 			|  <p>notebook's model.</p>							|

# passwordreset

## Send email



	POST /password-resets


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| String			|  <p>Email address to receive the password reset token.</p>							|
| link			| String			|  <p>Link to redirect user.</p>							|

## Submit password



	PUT /password-resets/:token


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>user's new password.</p>							|

## Verify token



	GET /password-resets/:token


# product

## Create product



	POST /products


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| title			| 			|  <p>product's title.</p>							|
| desc			| 			|  <p>product's desc.</p>							|
| category			| 			|  <p>product's category.</p>							|
| review			| 			|  <p>product's review.</p>							|
| model			| 			|  <p>product's model.</p>							|

## Delete product



	DELETE /products/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve product



	GET /products/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve products



	GET /products


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update product



	PUT /products/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| title			| 			|  <p>product's title.</p>							|
| desc			| 			|  <p>product's desc.</p>							|
| category			| 			|  <p>product's category.</p>							|
| review			| 			|  <p>product's review.</p>							|
| model			| 			|  <p>product's model.</p>							|

# review

## Create review



	POST /reviews


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| rating			| 			|  <p>review's rating.</p>							|
| text			| 			|  <p>review's text.</p>							|

## Delete review



	DELETE /reviews/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve review



	GET /reviews/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve reviews



	GET /reviews


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update review



	PUT /reviews/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| rating			| 			|  <p>review's rating.</p>							|
| text			| 			|  <p>review's text.</p>							|

# transaction

## Create transaction



	POST /transactions


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| products			| 			|  <p>transaction's products.</p>							|

## Delete transaction



	DELETE /transactions/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve transaction



	GET /transactions/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve transactions



	GET /transactions


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update transaction



	PUT /transactions/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| products			| 			|  <p>transaction's products.</p>							|

# user

## Create user



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>user's email.</p>							|
| password			| String			|  <p>user's password.</p>							|
| name			| String			| **optional** <p>user's name.</p>							|
| picture			| String			| **optional** <p>user's picture.</p>							|
| role			| String			| **optional** <p>user's role.</p>							|

## Delete user



	DELETE /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access_token.</p>							|

## Retrieve current user



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access_token.</p>							|

## Retrieve user



	GET /users/:id


## Retrieve users



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update password



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>user's new password.</p>							|

## Update user



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access_token.</p>							|
| name			| String			| **optional** <p>user's name.</p>							|
| picture			| String			| **optional** <p>user's picture.</p>							|


