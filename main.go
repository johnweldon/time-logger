package main

import (
    "net/http"

	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/x/", ServiceHandler)
	n := negroni.Classic()
	n.UseHandler(router)
	n.Run(":3000")
}

func ServiceHandler(w http.ResponseWriter, r *http.Request) {}
