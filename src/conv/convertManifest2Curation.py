import urllib.request
from bs4 import BeautifulSoup
import csv
import requests
import os
import json
import time
import glob

files = glob.glob("/Users/nakamura/git/d_iiif/iiif/src/collections/nijl/data/json/*.json")

for i in range(len(files)):

    file = files[i]

    file_id = file.split("/")[-1].replace(".json", "")

    opath = "/Users/nakamura/git/d_iiif/iiif/src/collections/nijl/data/curation/"+file_id+".json"

    if not os.path.exists(opath):

        fw = open(opath, 'w')
        curation_data = {}

        curation_uri = "curation:"+file_id+".json"

        with open(file) as f:
            try:
                df = json.load(f)
            except:
                continue

            anno_count = 1

            if "sequences" in df:

                print(file)

                members = []

                canvases = df["sequences"][0]["canvases"]
                for j in range(len(canvases)):
                    canvas = canvases[j]
                    if "otherContent" in canvas:
                        id = canvas["otherContent"][0]["@id"]

                        headers = {"content-type": "application/json"}

                        # time.sleep(0.5)

                        r = requests.get(id, headers=headers)

                        data = r.json()

                        print(id)

                        resources = data["resources"]

                        for resource in resources:
                            member_id = resource["on"]
                            res = resource["resource"]
                            chars = res["chars"]

                            member = {
                                "@id": member_id,
                                "@type": "sc:Canvas",
                                "label": "[Annotation " + str(anno_count) + "]",
                                "description": chars,
                                "metadata": [
                                    {
                                        "label": res["@type"],
                                        "value": chars
                                    }
                                ]
                            }

                            anno_count += 1

                            members.append(member)

                if len(members) > 0:

                    label = ""
                    if "label" in df:
                        label = df["label"]

                    curation_data = {
                        "@context": [
                            "http://iiif.io/api/presentation/2/context.json",
                            "http://codh.rois.ac.jp/iiif/curation/1/context.json"
                        ],
                        "@type": "cr:Curation",
                        "@id": curation_uri,
                        "label": "Automatic curation by IIIF Converter",
                        "selections": [
                            {
                                "@id": curation_uri + "/range1",
                                "@type": "sc:Range",
                                "label": "Automatic curation by IIIF Converter",
                                "members": members,
                                "within": {
                                    "@id": df["@id"],
                                    "@type": "sc:Manifest",
                                    "label": label
                                }
                            }
                        ]
                    }
                    

        json.dump(curation_data, fw, ensure_ascii=False, indent=4, sort_keys=True, separators=(',', ': '))

            
