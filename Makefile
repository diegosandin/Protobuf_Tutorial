.PHONY: all clean

all: go js

go:     add_person_go     list_people_go
gotest: add_person_gotest list_people_gotest
js: addressbook_js

clean:
	rm -f go/tutorialpb/*.pb.go add_person_go list_people_go
	rm -f node/addressbook.*

go/tutorialpb/addressbook.pb.go: addressbook.proto
	mkdir -p go/tutorialpb # make directory for go package
	protoc $$PROTO_PATH --go_opt=paths=source_relative --go_out=go/tutorialpb addressbook.proto

add_person_go: go/cmd/add_person/add_person.go go/tutorialpb/addressbook.pb.go
	cd go && go build -o ../add_person_go ./cmd/add_person

add_person_gotest: go/tutorialpb/addressbook.pb.go
	cd go && go test ./cmd/add_person

list_people_go: go/cmd/list_people/list_people.go go/tutorialpb/addressbook.pb.go
	cd go && go build -o ../list_people_go ./cmd/list_people

list_people_gotest: go/tutorialpb/addressbook.pb.go
	cd go && go test ./cmd/list_people

addressbook_js: 
	cd node && yarn code-gen