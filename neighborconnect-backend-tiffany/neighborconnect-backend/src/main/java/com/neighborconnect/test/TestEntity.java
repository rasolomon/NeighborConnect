package com.neighborconnect.test;

import com.neighborconnect.entity.User;

public class TestEntity {
    public static void main(String[] args){
        User user = new User();
        user.setName("The Great Robert A. Solomon Lord of the Lombok");
        System.out.println(user.getName());
    }
}
