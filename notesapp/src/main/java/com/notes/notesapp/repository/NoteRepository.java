package com.notes.notesapp.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.notes.notesapp.model.Note;

public interface NoteRepository extends MongoRepository<Note, String> {
    List<Note> findByUserId(String userId);
}
