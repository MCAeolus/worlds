import java.io.BufferedReader
import java.io.InputStreamReader
import javax.bluetooth.RemoteDevice
import javax.bluetooth.UUID
import javax.microedition.io.Connector
import javax.microedition.io.StreamConnectionNotifier


fun main(args: Array<String>) {
    runServer()
}

private fun runServer() {
    val uuid = UUID("1101", true)

    val connectString = "btspp://localhost:$uuid;name=JSON Transfer Server"
    val streamCon = Connector.open(connectString) as StreamConnectionNotifier

    println("Server started. Waiting on client.")
    val connection = streamCon.acceptAndOpen()

    val device = RemoteDevice.getRemoteDevice(connection)
    println("Address ${device.bluetoothAddress}, Name ${device.getFriendlyName(true)}")

    val inputStream = connection.openInputStream()
    val reader = BufferedReader(InputStreamReader(inputStream))

    val line = reader.readLine()
    println("From device: $line")

    streamCon.close()
}
