
# depv api design


## data flow

```graph-LR
project((project)) --> | analyser    | dependencies(dependencies)
dependencies       --> | visualizing | webApp((webApp))
dependencies       --> | render      | svg((svg))
```


## cli command


```graph-LR
depv((depv)) --> | --entry     | server
depv         --> | --ignores   | server
depv         --> | --seperator | server
depv         --> | --port      | server
depv         --> | --root      | server
```


## urls

### /visualize#/:nodeId

key | value
----|----
type | web app
method | GET


### /dependencies.svg


