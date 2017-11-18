import * as React from 'react';
import * as firebase from 'firebase';
import { DinerReservation } from '../../model';
import { DinerList } from '../../components/DinerList';
import { Link } from 'react-router-dom';

interface ReservationsOverviewPageProps {
  user: firebase.User;
}

interface ReservationOverviewPageState {
  isLoading: boolean;
  dinerReservations: DinerReservation[];
}

export class ReservationsOverviewPage
  extends React.Component <ReservationsOverviewPageProps, ReservationOverviewPageState> {

  constructor(props: ReservationsOverviewPageProps) {
    super(props);
    this.state = {
      isLoading: true,
      dinerReservations: []
    };
  }

  componentDidMount() {
    this.fetchReservations();
  }

  fetchReservations = () => {
    this.setState({...this.state, isLoading: true});
    return Promise.resolve([]).then((dinerReservations) => {
      this.setState({...this.state, isLoading: false, dinerReservations});
    });
  };

  render() {
    const {dinerReservations, isLoading} = this.state;
    return (
      <div>
        <DinerList
          reservations={dinerReservations}
          emptyListMessage={isLoading ? 'Aan het laden...' : 'Geen reservaties gevonden.'}
        />
        <Link className="btn btn-primary" to={"/reservaties/nieuw"}>Voeg reservatie toe</Link>
      </div>
    );
  }

}