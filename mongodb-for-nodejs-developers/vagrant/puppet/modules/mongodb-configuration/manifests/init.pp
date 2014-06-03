class 'mongodb-configuration'::files {
	file { "/data/db":
		ensure => "directory",
		mode   => 777,
	}
}

class 'mongodb-configuration' {
	include 'mongodb-configuration'::files
}
