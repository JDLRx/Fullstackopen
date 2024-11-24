  ```mermaid
  
  sequenceDiagram
  participant browser
  participant server

    
    Note right of browser: The Javascript code that handles the form.onsubmit redraws the notes list
    Note right of browser: The value input by the user is then send to the server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server

    server-->>browser: HTTP status code 201 Created
    deactivate server
  ```
