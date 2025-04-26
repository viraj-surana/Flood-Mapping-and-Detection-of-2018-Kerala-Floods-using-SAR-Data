// On 16th August 2018 severe floods affected Kerela
// due to usually high rainfall in monsoon season.(Worst flood in kerela in nearly a century)
// killed over 400 people and displaced a million more
// https://en.wikipedia.org/wiki/2018_Kerala_floods

var before_start = '2018-07-15'
var before_end = '2018-08-10'
var after_start = '2018-08-10'
var after_end = '2018-08-23'

var areaOfInterest = admin2.filter(ee.Filter.eq('ADM2_NAME','Ernakulam'))
var geometry = areaOfInterest.geometry()
Map.centerObject(geometry,12);

Map.addLayer(geometry, {color:'grey'}, 'Ernakulam District');

var filteredData = s1.filter(ee.Filter.eq('instrumentMode','IW'))
                      .filter(ee.Filter.listContains('transmitterReceiverPolarisation','VH'))
                      .filter(ee.Filter.listContains('transmitterReceiverPolarisation','VV'))
                      .filter(ee.Filter.eq('orbitProperties_pass','DESCENDING')) // Config params
                      .filter(ee.Filter.eq('resolution_meters',10)) // Config params
                      .filter(ee.Filter.bounds(geometry))
                      .select(['VV','VH'])

// print(filteredData.first())

var beforeCollection = filteredData.filter(ee.Filter.date(before_start,before_end))
var afterCollection = filteredData.filter(ee.Filter.date(after_start,after_end))
// print(beforeCollection)
// print(afterCollection)

var before = beforeCollection.mosaic().clip(geometry)
var after = afterCollection.mosaic().clip(geometry)


var addratioBand = function(image) {
  var ratioBand = image.select('VV').divide(image.select('VH')).rename('VV/VH')
  return image.addBands(ratioBand)
}
  
var beforeRGB = addratioBand(before)
var afterRGB = addratioBand(after)

print(beforeRGB)
print(afterRGB)

var vizParams = {
  min : [-25,-25,0],
  max : [0,0,2]
}

Map.addLayer(beforeRGB,vizParams,'Before')
Map.addLayer(afterRGB,vizParams,'After')