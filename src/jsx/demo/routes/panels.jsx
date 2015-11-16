import classNames from 'classnames';
import SidebarMixin from 'global/jsx/sidebar_component';

import Sidebar from 'common/sidebar';
import Footer from 'common/footer';


class Body extends React.Component {
  render() {
    return (
      <Container id='body'>
        <Grid>
          <Row>
            <Col sm={12}>
              <PanelContainer>
                <Panel>
                  <PanelBody className='text-center' style={{paddingBottom:35}}>
                    <h2>Panels Coming Here</h2>
                  </PanelBody>
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
