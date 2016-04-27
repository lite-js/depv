
# depv api design


## data flow

```graph-LR
project((project)) --> | analyser    | dependencies(dependencies)
dependencies       --> | visualizing | webApp((webApp))
dependencies       --> | render      | svg((svg))
```


## cli command


```graph-LR
depv((depv)) --> | --analyser  | server
depv         --> | --config    | server
depv         --> | --entry     | server
depv         --> | --ignores   | server
depv         --> | --name      | server
depv         --> | --port      | server
depv         --> | --root      | server
depv         --> | --separator | server
```


## urls

### /visualize#/:nodeId

key | value
----|----
type | web app
method | GET


### /dependencies.svg?analyser=npm&name=depv


