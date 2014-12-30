package main

import (
	"github.com/codegangsta/negroni"
)

func main() {
	n := negroni.Classic()
	n.Run(":3000")
}
