package com.notes.notesapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "notes")
public class Note {

    @Id
    private String id;
    private String title;
    private String content;
    private String color;

    // Constructors
    public Note() {}

    public Note(String title, String content, String color) {
        this.title = title;
        this.content = content;
        this.color = color;
    }

    // Getters
    public String getId() { return id; }
    public String getTitle() { return title; }
    public String getContent() { return content; }
    public String getColor() { return color; }

    // Setters
    public void setId(String id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setContent(String content) { this.content = content; }
    public void setColor(String color) { this.color = color; }
}
