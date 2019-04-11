import java.io.BufferedReader
import java.io.InputStreamReader
import javax.bluetooth.DiscoveryAgent
import javax.bluetooth.LocalDevice
import javax.bluetooth.RemoteDevice
import javax.bluetooth.UUID
import javax.microedition.io.Connector
import javax.microedition.io.StreamConnectionNotifier







val uuid = UUID("1101", true)

fun main(args: Array<String>) {

    LocalDevice.getLocalDevice().discoverable = DiscoveryAgent.GIAC



    runServer()
}

private fun runServer() {

    val connectString = "btspp://localhost:$uuid;name=JSON Transfer Server"
    val streamCon = Connector.open(connectString) as StreamConnectionNotifier

    println("Server started. Waiting on client.")
    val connection = streamCon.acceptAndOpen()

    val device = RemoteDevice.getRemoteDevice(connection)
    println("Address ${device.bluetoothAddress}, Name ${device.getFriendlyName(false)}")

    val inputStream = connection.openInputStream()
    val reader = BufferedReader(InputStreamReader(inputStream))

    val line = reader.readLine()
    println("From device: $line")

    streamCon.close()
}
