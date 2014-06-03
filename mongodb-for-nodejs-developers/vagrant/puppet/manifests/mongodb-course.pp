Exec { path => [ "/bin/", "/sbin/", "/usr/bin/", "/usr/sbin/", "/usr/local/bin/", "/usr/bin/env" ] }

exec { 'apt-get update':
	command => 'apt-get update',
	timeout => 60,
	tries => 3
}

$sysPackages = [ 'build-essential' ]
package { $sysPackages:
	ensure => "installed",
	require => Exec['apt-get update'],
}

# Install mongodb
class {'::mongodb::server':
}

# Install ndejs
class {'::nodejs':
}
