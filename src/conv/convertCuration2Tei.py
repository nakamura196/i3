import uuid
import xml.etree.ElementTree as ET
import json
import requests
import urllib
import csv


def exec2canvas(root, members, canvas, image):

    if ".jpg" not in image:
        image = image + "/full/full/0/default.jpg"

    surfaceGrp = root.find(prefix + "surfaceGrp")

    surface = ET.Element("{http://www.tei-c.org/ns/1.0}surface")
    surfaceGrp.append(surface)

    graphic = ET.Element("{http://www.tei-c.org/ns/1.0}graphic")
    surface.append(graphic)
    graphic.set("url", image)
    graphic.set("n", canvas)

    body = root.find(prefix + "body")

    p = ET.Element("{http://www.tei-c.org/ns/1.0}p")
    body.append(p)

    for i in range(len(members)):
        member = members[i]

        text = member["metadata"][0]["value"][0]["resource"]["chars"]

        area = member["@id"].split("#xywh=")[1].split(",")

        ulx = int(area[0])
        uly = int(area[1])
        lrx = ulx + int(area[2])
        lry = uly + int(area[3])

        zone_id = "zone_" + str(uuid.uuid1())

        zone = ET.Element("{http://www.tei-c.org/ns/1.0}zone")
        surface.append(zone)
        zone.set("xml:id", zone_id)
        zone.set("lry", str(lry))
        zone.set("lrx", str(lrx))
        zone.set("uly", str(uly))
        zone.set("ulx", str(ulx))

        span = ET.Element("{http://www.tei-c.org/ns/1.0}span")
        p.append(span)
        span.set("facs", "#" + zone_id)
        span.text = text

def get_data(url):
    r = requests.get(url)
    data = json.loads(r.content)
    return data

outputdir = "/Users/nakamura/git/d_utda/genji/docs/kuronet/anno"
tmp_path = "data/template.xml"

curation_uri = "https://raw.githubusercontent.com/nakamura196/genji/master/docs/kuronet/5008825ba0abc69f9cda5399eda3aa46.json"

import hashlib

file_uuid = hashlib.md5(curation_uri.encode('utf-8')).hexdigest()

prefix = ".//{http://www.tei-c.org/ns/1.0}"
xml = ".//{http://www.w3.org/XML/1998/namespace}"

tree = ET.parse(tmp_path)
ET.register_namespace('', "http://www.tei-c.org/ns/1.0")
root = tree.getroot()

curation_data = get_data(curation_uri)

manifest_url = curation_data["selections"][0]["within"]["@id"]

manifest = get_data(manifest_url)

canvas_image_map = {}

canvases = manifest["sequences"][0]["canvases"]

for canvas in canvases:
    canvas_image_map[canvas["@id"]] = canvas["thumbnail"]["service"]["@id"]

members = curation_data["selections"][0]["members"]

canvas_area_map = {}

for i in range(len(members)):

    member = members[i]
    member_id = member["@id"].split("#xywh=")

    canvas_id = member_id[0]
    area = member_id[1].split(",")

    if canvas_id not in canvas_area_map:
        canvas_area_map[canvas_id] = []
    canvas_area_map[canvas_id].append(member)


for canvas_id in canvas_area_map:
    exec2canvas(root, canvas_area_map[canvas_id], canvas_id, canvas_image_map[canvas_id])

surfaceGrp = root.find(prefix + "surfaceGrp")
surfaceGrp.set("facs", manifest_url)

title = root.find(prefix + "title")
title.text = manifest["label"]

metadata = manifest["metadata"]

ident = file_uuid 
relation = curation_uri

sourceDesc = root.find(prefix + "sourceDesc")
p = ET.Element("{http://www.tei-c.org/ns/1.0}p")
sourceDesc.append(p)

ref = ET.Element("{http://www.tei-c.org/ns/1.0}ref")
p.append(ref)

ref.set("target", relation)
ref.text = relation

tree.write(outputdir + "/" + ident + "/" + "tei.xml", encoding="utf-8")
