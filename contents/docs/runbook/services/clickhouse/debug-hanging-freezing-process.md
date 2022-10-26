---
title: Debug hanging / freezing process
sidebar: Docs
showTitle: true
---
If a ClickHouse node is unresponsive and you don't know what is happening, you can easily check the stacktraces of all the working threads by running:

```sql
SELECT
 arrayStringConcat(arrayMap(x -> demangle(addressToSymbol(x)), trace), '\n') AS trace_functions,
 count()
FROM system.stack_trace
GROUP BY trace_functions
ORDER BY count()
DESC
SETTINGS allow_introspection_functions=1
FORMAT Vertical;
```

If you can't run any query but you have access to the node running the process, you can execute the following command to send a `TSTP` signal to every thread of the process:

```shell
for i in $(ls -1 /proc/$(pidof clickhouse-server)/task/); do kill -TSTP $i; done
```

Stack traces will be printed in the ClickHouse logs.
