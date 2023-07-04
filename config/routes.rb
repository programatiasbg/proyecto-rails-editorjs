Rails.application.routes.draw do
  resources :articles
  root 'articles#index'
end

# rails g scaffold article title content:json
# Agregar algunos paquetes especificos
# yarn add @editorjs/editorjs @editorjs/header @editorjs/list @editorjs/paragraph @editorjs/code
