package com.publictransport.tracker;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransportOption{
    private String type;
    private String name;
    private double latitude;
    private double longitude;
}