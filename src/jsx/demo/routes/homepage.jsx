import classNames from 'classnames';
import SidebarMixin from 'global/jsx/sidebar_component';

import Sidebar from 'common/sidebar';
import Footer from 'common/footer';


class MainChart extends React.Component {
  componentDidMount() {

 var now = moment().minutes(0).seconds(0).milliseconds(0);
 var groupCount = 3;
 var itemCount = 7;
 var group0Time = 0;
 var group1Time = 0;
 var group2Time = 0;

 // create a dataset with items
 var items = new vis.DataSet();
 for (var i = 0; i < itemCount; i++) {
   var start = now.clone().add(Math.random() * 20, 'hours');
   var end = start.clone().add((Math.random() * 2), 'hours');
      
   var group = Math.floor(Math.random() * groupCount);
   var style  ='';
   if(group == 0){
      var diffInMillisecs = moment.duration(end.diff(start))._milliseconds;
      var hourDiff = diffInMillisecs / (60*60*1000);
      group0Time = group0Time + hourDiff;
      style='color: red; background-color: red;'
   }
   if(group == 1){
      var diffInMillisecs = moment.duration(end.diff(start))._milliseconds;
      var hourDiff = diffInMillisecs / (60*60*1000);
      group1Time = group1Time + hourDiff;
      style='color: blue; background-color: blue;'
   }
   if(group == 2){
      var diffInMillisecs = moment.duration(end.diff(start))._milliseconds;
      var hourDiff = diffInMillisecs / (60*60*1000);
      group2Time = group2Time + hourDiff;
      style='color: green; background-color: green;'
   }
   items.add({
     id: i,
     group: group,
     start: start,
     end: end,
     type: 'range',
     style: style,
     margin: 0
   });
  }

  // create a data set with groups
   var names = [
      'AHU Cool Failure:        ' + Math.round( group0Time * 10) / 10 +'h', 
      'AHU Cool/Heat Mode Cycle: '+ Math.round( group1Time * 10) / 10 +'h', 
      'AHU Fan Short Cycling:    '+ Math.round( group2Time * 10) / 10 +'h'];
   var groups = new vis.DataSet();
   groups.add({id: 0, content: names[0]});
   groups.add({id: 1, content: names[1]});
   groups.add({id: 2, content: names[2]});

  // create visualization
  var container = document.getElementById('visualization');
  var options = {
      height:"190px",
      groupOrder: 'content',  // groupOrder can be a property name or a sorting function
      stack: false,
      timeAxis: {scale: 'hour', step: 1},
      showMajorLabels: true,
      showMinorLabels: true,
      zoomMax: 86400000,
      zoomMin: 1800000
    };

  var timeline = new vis.Timeline(container);
  timeline.setOptions(options);
  timeline.setGroups(groups);
  timeline.setItems(items);


  }
  render() {
    return (
      <PanelBody style={{paddingTop: 10, height: 210}}>
        <div id='visualization'></div>
      </PanelBody>
    );
  }
}

class Body extends React.Component {
  render() {
    return (
      <Container id='body'>
        <Grid>
          <Row>
            <Col sm={12}>
              <PanelContainer plain={true}>
                <Panel>
                  <div className='text-center'>

                  <MainChart />

                  </div>
                </Panel>
              </PanelContainer>
            </Col>
          </Row>
        </Grid>
      </Container>
    );
  }
}

@SidebarMixin
export default class extends React.Component {
  render() {
    var classes = classNames({
      'container-open': this.props.open
    });

    return (
      <Container id='container' className={classes}>
        <Sidebar />
        <Body />
        <Footer />
      </Container>
    );
  }
}
