package third.factor.auth;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

public class ThirdFactorAuthLambdaRequestHandler implements RequestHandler<Map<String, String>, Boolean> {

	@Override
	public Boolean handleRequest(Map<String, String> input, Context context) {
		String inputCipherText = input.get("data");
		String email = input.get("email");
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> response = restTemplate
				.exchange("https://kiuy4j7k8h.execute-api.us-east-1.amazonaws.com/prod/users/" + email, HttpMethod.GET, null, String.class);
		JSONObject jsonObject = new JSONObject(response.getBody());
		String userCipherText = ((JSONObject) jsonObject.getJSONArray("Items").get(0)).getJSONObject("cipherText").get("S").toString();
		return inputCipherText.equals(userCipherText);
	}

}
