Feature: Order a tiket for 17:00
    Scenario: Should buy a ticket for a date in 7 days for a moovie at 21:00
        Given user is on page
        When user choose a "8" date, "21:00" and "5" th row and "6" th seat for a seance
        Then user sees page which contains text "Электронный билет"