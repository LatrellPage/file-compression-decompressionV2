package com.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class FileController {

    private final CompressionService compressionService;

    @Autowired
    public FileController(CompressionService compressionService) {
        this.compressionService = compressionService;
    }

    @PostMapping("/compress")
    public ResponseEntity<?> compressFile(@RequestParam("file") MultipartFile file,
                                          @RequestParam("compressorType") String compressorType) {
        try {
            byte[] compressedData = compressionService.compressFile(file.getBytes(), compressorType);
            ByteArrayResource resource = new ByteArrayResource(compressedData);

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + file.getOriginalFilename() + "." + compressorType)
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .contentLength(compressedData.length)
                    .body(resource);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error compressing file: " + e.getMessage());
        }
    }
}