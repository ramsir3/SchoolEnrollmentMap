import sys, csv, json
from dataDicts import *
from collections import Counter
NUMLINES = -1

def extractData(*args):
    if len(args) < 2:
        raise ValueError('No range specified')

    line = args[0]
    ranges = args[1:]
    out = list()
    for r in ranges:
        out.append(line[r[0]-1:r[1]])

    return out

if len(sys.argv) != 3:
    raise ValueError('Not enough arguments')

data = dict()
numLines = 0
numPoints = 0
with open(sys.argv[1], 'r') as f:
    for line in f:
        if numLines == NUMLINES:
            break
        # print(line)
        relevant = extractData(line, stateLoc, pubOrPriLoc, ageLoc)
        if int(relevant[2]) <= 18:
            numPoints += 1
            if relevant[0] not in data:
                data[relevant[0]] = Counter()
            data[relevant[0]].update([int(relevant[1])])
        numLines += 1

print("number of samples: %d\nNumber of samples <= 18 yrs: %d\nRatio: %f\n" % (numLines, numPoints, float(numPoints)/numLines))

with open(sys.argv[2], 'w') as f:
    # w = csv.writer(f)
    # w.writerow(["STATE", "PRI TO PUB"])
    # for key in data:
    #     w.writerow([stateCodes[key], float(data[key][2])/data[key][1]])
    outData = {"label":"US States", "primaryKey":"OBJECTID", "fields":[
        {
         "name":"OBJECTID",
         "label":"OBJECTID",
         "type":"esriFieldTypeOID",
         "index":0
        },
        {
         "name":"STATE_ABBR",
         "label":"STATE_ABBR",
         "type":"esriFieldTypeString",
         "index":1
        },
        {
         "name":"PRIPUBRT",
         "label":"PRIPUBRT",
         "type":"esriFieldTypeDouble",
         "index":2
        }]}
    records = list()
    i = 1
    for key in data.keys():
        records.append({"attributes": {"OBJECTID": i, "STATE_ABBR": stateCodes[key], "PRIPUBRT": float(data[key][2])/data[key][1]}})
        i += 1
    outData["records"] = records
    f.write(json.dumps(outData))

