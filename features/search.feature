Feature: Order a tiket for 17:00
    Scenario: Should buy a ticket for a date in 7 days for a moovie at 17:00
        Given user is on page
        When user choose a "8" date, "17:00" and "5" th row and "6" th seat for a seance
        Then user sees page which contains text "Электронный билет"
    
    Scenario: Should buy a ticket for today for a moovie at 21:00
        Given user is on page
        When user choose a "1" date, "21:00" and "5" th row and "6" th seat for a seance
        Then user sees page which contains text "Электронный билет"
    
    Scenario: Should order a tiket twice
        Given user ordered a ticket with parameters: "1" as date, "21:00" and "7" th row and "8" th seat for a seance. And returned to the first page
        When user tries to order a tiket with same parameters: "1" as date, "21:00" and "7" th row and "8" th seat
        Then test fails
        