// Kerala 2018 Flood Visualization App
// Ernakulam District - Sentinel-1 Analysis with Swipe Slider

// Define date ranges
var before_start = '2018-07-15';
var before_end = '2018-08-10';
var after_start = '2018-08-10';
var after_end = '2018-08-23';

// Area of Interest - Ernakulam
var areaOfInterest = admin2.filter(ee.Filter.eq('ADM2_NAME','Ernakulam'));
var geometry = areaOfInterest.geometry();

// Sentinel-1 Filtered Data
var filteredData = s1.filter(ee.Filter.eq('instrumentMode','IW'))
                    .filter(ee.Filter.listContains('transmitterReceiverPolarisation','VH'))
                    .filter(ee.Filter.listContains('transmitterReceiverPolarisation','VV'))
                    .filter(ee.Filter.eq('orbitProperties_pass','DESCENDING'))
                    .filter(ee.Filter.eq('resolution_meters',10))
                    .filter(ee.Filter.bounds(geometry))
                    .select(['VV','VH']);

// Pre- and Post-flood Collections
var beforeCollection = filteredData.filter(ee.Filter.date(before_start, before_end));
var afterCollection = filteredData.filter(ee.Filter.date(after_start, after_end));

var before = beforeCollection.mosaic().clip(geometry);
var after = afterCollection.mosaic().clip(geometry);

// Add VV/VH Ratio Band
var addRatioBand = function(image) {
  var ratioBand = image.select('VV').divide(image.select('VH')).rename('VV/VH');
  return image.addBands(ratioBand);
};

var beforeRGB = addRatioBand(before);
var afterRGB = addRatioBand(after);

// Visualization Parameters
var vizParams = {
  bands: ['VV', 'VH', 'VV/VH'],
  min: [-25, -25, 0],
  max: [0, 0, 2],
};

// Create Map Layers
var leftMap = ui.Map();
var rightMap = ui.Map();

leftMap.centerObject(geometry, 10);
rightMap.centerObject(geometry, 10);

leftMap.addLayer(beforeRGB, vizParams, 'Before Flood');
leftMap.addLayer(geometry, {color: 'grey'}, 'Ernakulam District',false);

rightMap.addLayer(afterRGB, vizParams, 'After Flood');
rightMap.addLayer(geometry, {color: 'grey'}, 'Ernakulam District',false);

// Link Maps
var linker = ui.Map.Linker([leftMap, rightMap]);

// Create Split Panel
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true
});

// Create Main Interface
var mainPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {stretch: 'both'}
});

// CORRECTED Information Panel
var infoPanel = ui.Panel({
  style: {
    width: '100%',
    padding: '8px',
    backgroundColor: '#f8f9fa'
  }
});

// CORRECTED Label Styles (removed nested 'style' property)
infoPanel.add(ui.Label('Kerala 2018 Flood Visualization - Ernakulam District', {
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#1a73e8'
}));

infoPanel.add(ui.Label('Sentinel-1 SAR Analysis: Before (Jul 15-Aug 10) vs After (Aug 10-23)', {
  margin: '4px 0'
}));

infoPanel.add(ui.Label('Use horizontal swipe to compare flood impacts', {
  color: '#5f6368'
}));

// Assemble UI
mainPanel.add(infoPanel);
mainPanel.add(splitPanel);

// Clear default UI components
ui.root.widgets().reset([mainPanel]);

// Add console message
print('App initialized successfully! Use the swipe control to compare flood effects.');