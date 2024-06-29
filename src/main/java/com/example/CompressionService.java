package com.example;

import org.apache.commons.compress.compressors.CompressorException;
import org.apache.commons.compress.compressors.CompressorOutputStream;
import org.apache.commons.compress.compressors.CompressorStreamFactory;
import org.apache.commons.compress.utils.IOUtils;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class CompressionService {

    private static final Logger logger = LoggerFactory.getLogger(CompressionService.class);

    public byte[] compressFile(byte[] fileData, String compressorType) throws IOException {
        logger.info("Compressing file with compressor type: {}", compressorType);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try (CompressorOutputStream compressorOutputStream = new CompressorStreamFactory()
                .createCompressorOutputStream(compressorType, outputStream)) {
            IOUtils.copy(new ByteArrayInputStream(fileData), compressorOutputStream);
        } catch (CompressorException e) {
            throw new IOException("Failed to compress file", e);
        }
        return outputStream.toByteArray();
    }
}