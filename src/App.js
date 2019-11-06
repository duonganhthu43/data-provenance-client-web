import React from 'react'
import { Route, Switch } from 'react-router'
import { MuiThemeProvider } from '@material-ui/core/styles';
import './styles/main.scss';
import Login from "./components/Login";
import UserInfo from './components/UserInfo/UserInfo';
import Dataset from './components/Dataset/Dataset'
import Resources from './components/Resoures/resources'
import { globalTheme } from './components/Common/GlobalThemeOverride';
import { ConnectedRouter } from 'connected-react-router'
import DatasetDetail from './components/DatasetDetail/DatasetDetail'
import ResourceDetail from './components/ResourceDetail/ResourceDetail'
import CreateNewDataset from './components/CreateNewDataset/CreateNewDataset'

const App = ({ history }) => (
	<MuiThemeProvider theme={globalTheme}>
		<ConnectedRouter history={history}>
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/datasets" component={Dataset} />
				<Route exact path="/datasets/new-dataset" component={CreateNewDataset} />
				<Route exact path="/datasets/edit-dataset" component={CreateNewDataset} />
				<Route exact path="/user-info" component={UserInfo} />
				<Route exact path="/user-info/current-user" component={UserInfo} />
				<Route exact path="/resources" component={Resources} />
				<Route exact path="/resource-detail" component={ResourceDetail} />
				<Route exact path="/dataset-detail" component={DatasetDetail} />
				<Route exact path={''} component={UserInfo} />
			</Switch>
		</ConnectedRouter>
	</MuiThemeProvider>
);
export default App
