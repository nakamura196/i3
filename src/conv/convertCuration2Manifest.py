import urllib.request
from bs4 import BeautifulSoup
import csv
import requests
import os
import json
import time
import glob
import hashlib

def get_data(url):
    r = requests.get(url)
    data = json.loads(r.content)
    return data

def set_otherContent(data_manifest, canvas_id, annolist_id):
    canvases = data_manifest["sequences"][0]["canvases"]
    for i in range(len(canvases)):
        canvas = canvases[i]
        if canvas["@id"] == canvas_id:
          canvas["otherContent"] = [{
            "@id": annolist_id,
            "@type": "sc:AnnotationList"
          }]
    return data_manifest

curation_uri = "https://raw.githubusercontent.com/nakamura196/genji/master/docs/kuronet/5008825ba0abc69f9cda5399eda3aa46.json"

prefix_url = "https://nakamura196.github.io/genji/kuronet/anno"
prefix_dir = "/Users/nakamura/git/d_utda/genji/docs/kuronet/anno"

uuid = hashlib.md5(curation_uri.encode('utf-8')).hexdigest()

manifest_map = {}
canvas_map = {}

curation_data = get_data(curation_uri)

selections = curation_data["selections"]
for i in range(len(selections)):
    selection = selections[i]
    manifest = selection["within"]["@id"]

    if manifest not in manifest_map:
        manifest_map[manifest] = []
     
    members = selection["members"]

    for j in range(len(members)):

        member = members[j]
        id_member = member["@id"]
        split_id_member = id_member.split("#")
        canvas_id = split_id_member[0]

        canvas_list = manifest_map[manifest]
        if canvas_id not in canvas_list:
            canvas_list.append(canvas_id)

        xywh = split_id_member[1]

        if canvas_id not in canvas_map:
            canvas_map[canvas_id] = []

        canvas_map[canvas_id].append({
            "metadata": member["metadata"],
            "xywh": xywh
        })

    

collection_uri = prefix_url+"/"+uuid+"/collection.json"
collection = {
    "@context": "http://iiif.io/api/presentation/2/context.json",
    "label": curation_data["label"],
    "@type": "sc:Collection",
    "vhint": "use-thumb",
    "@id": collection_uri,
    "manifests": []
}

for manifest in manifest_map:

    print(manifest)

    data_manifest = get_data(manifest)

    if data_manifest == None:
        print("Error: " + manifest)
        continue

    new_manifest = prefix_url+"/"+uuid+"/manifest.json"

    canvas_list = manifest_map[manifest]
    for i in range(len(canvas_list)):

        canvas_id = canvas_list[i]
        curation_list = canvas_map[canvas_id]

        annolist_id = prefix_url+"/"+uuid+"/list/annolist_"+str(i)+".json"

        annolist = {
            "@context": "http://iiif.io/api/presentation/2/context.json",
            "@id": annolist_id,
            "@type": "sc:AnnotationList",
            "resources": []
        }

        for j in range(len(curation_list)):

        
            curation = curation_list[j]

            '''
            text = str(curation["metadata"]) #注意
            if text == None:
                text = "Curation [" + str(j + 1) + "]"
            '''
            text = curation["metadata"][0]["value"][0]["resource"]["chars"]
        
            xywh = curation["xywh"]

            if ",1,1" in xywh:
                xywh = xywh.replace(",1,1", ",50,50")

            anno_id = annolist_id + "#" + str(j)

            anno = {
                "@id": anno_id,
                "@type": "oa:Annotation",
                "motivation": "sc:painting",
                "resource": {
                    "@type": "cnt:ContentAsText",
                    "chars": text,
                    "format": "text/plain"
                },
                "on": canvas_id + "#" + xywh
            }

            annolist["resources"].append(anno)


        fw = open(annolist_id.replace(prefix_url, prefix_dir), 'w')
        json.dump(annolist, fw, ensure_ascii=False, indent=4, sort_keys=True, separators=(',', ': '))

        

        # update(annolist_id, annolist)

        data_manifest = set_otherContent(data_manifest, canvas_id, annolist_id)

    

    

    data_manifest["@id"] = new_manifest
    # update(new_manifest, data_manifest)

    data_manifest["service"] = {
        "@context": "http://iiif.io/api/search/0/context.json",
        "@id": "https://w3id.org/dhj/i3sa/"+new_manifest.replace("manifest.json", "tei.xml"),
        "profile": "http://iiif.io/api/search/0/search",
        "label": "Search within this manifest"
    }


    ### 以下、Collection

    # IIIF Collection用のOBJ
    obj = {
        "@type": "sc:Manifest",
        "@id": new_manifest,
        "label": data_manifest["label"]
    }

    if data_manifest["sequences"][0]["canvases"][0]["thumbnail"]:
        obj["thumbnail"] = data_manifest["sequences"][0]["canvases"][0]["thumbnail"]["@id"]

    fw = open(new_manifest.replace(prefix_url, prefix_dir), 'w')
    json.dump(data_manifest, fw, ensure_ascii=False, indent=4, sort_keys=True, separators=(',', ': '))
    

    collection["manifests"].append(obj)

fw = open(collection_uri.replace(prefix_url, prefix_dir), 'w')
json.dump(collection, fw, ensure_ascii=False, indent=4, sort_keys=True, separators=(',', ': '))
